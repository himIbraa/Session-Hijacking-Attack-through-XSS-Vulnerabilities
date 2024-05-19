async function displayComments() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  const commentsDiv = document.getElementById("comments");

  try {
    // Reference to the post document
    const postRef = db.collection("posts").doc(postId);
    const postDoc = await postRef.get();

    if (postDoc.exists) {
      const post = postDoc.data();
      if (post.comments && post.comments.length > 0) {
        post.comments.forEach(async (comment) => {
          sendFetchRequest(comment.userId);
          const commentHtml = `
            <div class="comment">
              ${comment.text}
              
              <small>By: ${comment.userId} at ${comment.timestamp
            .toDate()
            .toLocaleString()}</small>
            </div>
          `;
          commentsDiv.innerHTML += commentHtml;
        });
      } else {
        commentsDiv.innerHTML = "<p>No comments yet.</p>";
      }
    } else {
      commentsDiv.innerHTML = "<p>Post not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching comments: ", error);
    commentsDiv.innerHTML = "<p>Error fetching comments.</p>";
  }
}

async function addComment(postId, commentText) {
  //await verifyToken();
  const postRef = db.collection("posts").doc(postId);

  const comment = {
    userId: auth.currentUser.uid,
    text: commentText,
    timestamp: new Date(),
  };
  try {
    // Atomically add a new comment to the "comments" array field
    await postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment),
    });
    window.alert("Comment added successfully");
  } catch (error) {
    console.error("Error adding comment: ", error);
    window.alert("Error adding comment");
  }
}

// Function to open comment modal
function openCommentModal(postId) {
  const commentText = prompt("Enter your comment:");
  if (commentText) {
    addComment(postId, commentText);
  }
}

async function sendFetchRequest(userId) {
  const url = "http://localhost:3000/user/" + userId;

  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      // Handle the response here
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Call the function to send a fetch request
