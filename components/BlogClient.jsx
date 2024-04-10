import Blogs from './Blogs';

export default function BlogClient({postData}) {
  return (
    <>
    {postData.map((blog) => {
        return (
          <Blogs
            tags={blog.tags}
            id={blog.id}
            key={blog.id}
            img={blog.img}
            description={blog.body}
            title={blog.title}
            date={blog.date}
          />
        );
      })}
    </>
    
  )
}
