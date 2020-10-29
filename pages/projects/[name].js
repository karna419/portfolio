import React, {useEffect} from 'react'
import Link from 'next/link';
import posts from '../projects.json'
import {useRouter} from 'next/router'

const Index = props => {

  useEffect(() => {
    router.prefetch('/login')
    return () => {
      
    }
  }, [])

  const router = useRouter()
  
  return (
    
    <div>
      <h2>Karunagaran</h2>
      <h3>Full-Stack Developer</h3>
    </div>
  )

}
  
Index.getInitialProps = ({query}) => {
  return {
    posts: posts[query.name]
  }
}
export default Index;
