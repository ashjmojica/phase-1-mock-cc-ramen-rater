function getRamen(){
    fetch("http://localhost:3000/ramens")
    .then((r) => r.json())
    .then((data) => renderRamen(data));
  }
  getRamen()
  const ramenDetail = document.querySelector("#ramen-detail");
  
  const ramenMenu = document.querySelector("#ramen-menu");
  const detailImage = document.querySelector(".detail-image");
  const ramenName = document.querySelector(".name");
  const restaurant = document.querySelector('.restaurant')
  const ramenRating = document.querySelector('#rating-display')
  const ramenComment = document.querySelector('#comment-display')
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'delete'
  ramenDetail.append(deleteButton)
  
  deleteButton.addEventListener('click', ()=>{
    fetch(`http://localhost:3000/ramens/${deleteButton.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
      .then(r => r.json())
      .then(() => {
        getRamen()
        detailImage.src = './assets/image-placeholder.jpg'
        ramenName.textContent = 'Insert Name Here'
        restaurant.textContent = 'Insert Restaurant Here'
        ramenRating.textContent = 'Insert rating here';
        ramenComment.textContent = 'Insert comment here';
        detailImage.id = ''
        deleteButton.id = ''
      })
  })
  
  patchRating(detailImage, ramenRating, ramenComment)
  
  function renderRamen(ramens) {
    while (ramenMenu.firstChild) {
      ramenMenu.removeChild(ramenMenu.firstChild);
    }
    ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.addEventListener("click", () => {
        detailImage.src = ramen.image;
        ramenName.textContent = ramen.name;
        restaurant.textContent = ramen.restaurant;
        ramenRating.textContent = ramen.rating;
        ramenComment.textContent = ramen.comment;
        detailImage.id = ramen.id
        deleteButton.id = ramen.id;
        
      });
      ramenMenu.append(img);
    });
  }
  
  
  function postRamen(){
    const ramenForm = document.querySelector('#new-ramen')
    ramenForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const newName = e.target['name'].value
      const newRestaurant = e.target['restaurant'].value
      const newImage = e.target['image'].value
      const newRating = e.target['rating'].value
      const newComment = e.target['new-comment'].value
  
      const newRamenObj = {
        name: newName,
        restaurant: newRestaurant,
        image: newImage,
        rating: newRating,
        comment: newComment
      }
  
      fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newRamenObj)
      })
      .then(r => r.json())
      .then(newRamen => renderRamen([newRamen]))
    })
  }
  
  function patchRating(img, rating, comment){
    patchForm = document.querySelector('#edit-ramen');
    patchForm.addEventListener('submit', (e)=>{
      e.preventDefault();
  
      rating.textContent = parseInt(rating.textContent) + parseInt(e.target['new-rating'].value);
      comment.textContent = e.target['new-comment'].value;
      fetch(`http://localhost:3000/ramens/${img.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          rating: parseInt(rating.textContent),
          comment: comment.textContent
        })
      })
      .then(r => r.json())
      .then(newRamen => {
        getRamen()
      })
      
    })
  }
  
  postRamen();


 