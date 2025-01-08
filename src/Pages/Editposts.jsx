import React , {useState , useEffect}from 'react'
import appwriteservice from '../Appwrite/config'
import {useParams , useNavigate} from 'react-router-dom'
import {Container , PostForm} from '../Components'
function Editposts() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [post , setPost] = useState([])
    useEffect(()=>{
        appwriteservice.getPost(id).then((res)=>{
            if(res){
                setPost(res)
            }else{
                navigate('/posts')
            }
        })
    },[id,navigate ])
  return (
    <div>
        <Container>
            <div className=''>
                <PostForm post={post} />
            </div>
        </Container>
    </div>
  )
}

export default Editposts