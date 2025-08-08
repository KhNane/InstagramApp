type Image = {
  image: {
    id: string;
    post: string;
    imageUrl: string;
    createdAt: string;
    user: {
      username: string;
    };
    comments:[{
      comment: string;
      comment_date: string;
    }]
  };
};

export default function Comments({ image }: Image) {
  return(
    <div>
      <div>
        <span>{image.user.username}</span>
      </div>
      <div>
        <span>{image.comments[0].comment}</span>
      </div>
    </div>
  )
}