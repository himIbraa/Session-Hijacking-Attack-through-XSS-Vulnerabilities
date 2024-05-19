async function handleAddPost() {
  const form = document.getElementById("post-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;

    if (title && content) {
      //addPost(title, content);
      const data = {
        title: title,
        content: content,
        userId: await verifyToken().then((uid) => {
          return uid;
        }),
      };

      // Add a new document in collection "posts"
      const res = await db
        .collection("posts")
        .add(data)
        .then(function (_) {
          window.alert("Post added successfully");
        })
        .catch((_) => {
          window.alert("Error adding post");
        });
    }
  });
}
function displayPosts() {
  var postsDiv = document.getElementById("posts");

  // Query Firestore to fetch all posts
  db.collection("posts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var post = doc.data();
        // add a link to see the post comments in a new page
        var postHtml = `
          <div class="post">
            <h2>${post.title}</h2>
            <p>${post.content}</p> 
            <div class="post-buttons">
              <button class="left-button" onclick="openCommentModal('${doc.id}')">Comment</button>
              <button class="right-button" onclick="window.location.href='comments.html?postId=${doc.id}'">See All Comments</button>
            </div>
          </div>
        `;
        postsDiv.innerHTML += postHtml;
      });
    })
    .catch((error) => {
      console.error("Error fetching posts: ", error);
    });
}

// function to read the token from the cookie and sends a verification request to the server
async function verifyToken() {
  const allCookies = document.cookie;

  // Parse cookies into an object
  const cookies = allCookies.split(";").reduce((cookiesObject, cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookiesObject[name] = decodeURIComponent(value);
    return cookiesObject;
  }, {});

  // Access a specific cookie by its name
  const token = cookies["token"];
  if (token) {
    try {
      const response = await fetch("http://localhost:3000/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-control-Allow-Origin": "*",
        },
        body: JSON.stringify({ token: token }),
      });
      const data = await response.json();

      const { userId } = data;
      return userId;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
