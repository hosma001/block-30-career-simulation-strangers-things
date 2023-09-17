const MostExpensivePost = ({ posts }) => {
    let maxPrice = 0;
    
    posts.forEach((post) => {
      if (post.price * 1 > maxPrice) {
        maxPrice = post.price;
      }
    });
    return (
      <>
        <p>The most expensive post: { maxPrice }</p>
      </>
    )
  };

  export default MostExpensivePost;