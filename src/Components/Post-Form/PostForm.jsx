import React , {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import service from '../../Appwrite/config'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {Select , Logo , RTE , Button} from '../index'



function PostForm({post}) {
    const {register, handleSubmit , watch , setValue , control , getValues} = useForm({
        defaultValues:{
            title : post?.title || "",
            content : post?.content || "",
            status : post?.status || "active",
            userId : post?.userId || ""
        }
    })
    const navigate = useNavigate()
    const userdata = useSelector(state => state.user)

    const submit = async (data) =>{
        if(post){
            const file = data.image[0] ? service.uploadFile(data.image[0]):null

            if(file){
               service.deleteFile(post.featuredimage)
            }
        }
        const dbpost = await service.updatePost(post.$id , {
            ...data,
            featuredimage : file ? file.$id : undefined       
        })
        if(dbpost){
            navigate(`/post/${dbpost.$id}`)
        }else{
            const file = await service.uploadFile(data.image[0])
            if(file){
                const fileid = file.$id
                data.featuredimage = fileid
                const dbpost = await service.createPost({
                    ...data,
                    userId : userdata.$id
                })
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }
    const slugtransform=useCallback((value)=>{
        if(value && typeof value === "string"){
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, '-')
            
        }
        return ""
    } , [])
    React.useEffect(()=>{
        const subscription = watch((value , {name})=>{
            if(name === "title"){
                setValue("slug" , slugtransform(value))
            }
        })
        return ()=>{subscription.unsubscribe()}
    } ,[watch , slugtransform ,setValue])

    return (  
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}

export default PostForm