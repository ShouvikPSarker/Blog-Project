import React from 'react'
import { Container } from '../Components'
import PostForm from '../Components/Post-Form/PostForm'
function AddPosts() {
  return (
    <div classname='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPosts