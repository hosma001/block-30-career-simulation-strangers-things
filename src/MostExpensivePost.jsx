const MostExpensivePost = (posts) => {
    let maxPrice = 0;
    
    posts.forEach((post) => {
      if (post.price*1 > maxPrice) {
        maxPrice = post.price;
      }
    });
    console.log(maxPrice);
    return (
        <div>
            {
            maxPrice    
            }
        </div>
    )
  };

  export default MostExpensivePost;