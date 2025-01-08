import React , {useState , useEffect}from 'react'
import {Container ,Postcard} from '../Components'
import { service } from '../Appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        service.getPosts([]).then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })
    },[])
    
  return (
    <div className='w-full py-10'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>{
                    <div key={post.$id} className='p-2 w-1/5'>
                        <Postcard post={post}/>
                    </div>
                })}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts