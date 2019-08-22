import React, { useEffect, useReducer, useRef, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

const PAGE_SIZE = 3
let feedState = null
let defaultState = {
  limit: PAGE_SIZE,
  posts: []
}

function Feed() {
  // create the store
  const [posts, setPosts] = useState([fakePost])
  const [newPosts, setNewPosts] = useState([])
  const [limit, setLimit] = useState(3)
  const [timestamp, setTimestamp] = useState(Date.now())

  // load posts on instantiate / limit change
  useEffect(() => {
    let isCurrent = true  //local to this effect
    loadFeedPosts(timestamp, limit).then(data => {
      if (isCurrent) {
        setPosts(data)
      }
    })
      
    return () => isCurrent = false  //cleanup; cancel handling callback
  }, [timestamp, limit])

  // load new posts
  useEffect(() => {
    let isCurrent = true
    subscribeToNewFeedPosts(timestamp, data => {
      if (isCurrent) setNewPosts(data)
    })
    return () => isCurrent = false
  }, [timestamp])

  function handleViewNewPosts() {
    setPosts(newPosts.concat(posts))
    setNewPosts([])
    setLimit(newPosts.length + limit)
    setTimestamp(Date.now())
  }


  // save the state on each render to persist on navigation
  useEffect(() => {
    feedState = {}  //actual state
  })


  return (
    <div className="Feed">
      { !!newPosts.length &&
        <div className="Feed_button_wrapper">
        <button
          onClick={handleViewNewPosts}
          className="Feed_new_posts_button icon_button"
        >
            View {newPosts.length} New Posts
          </button>
        </div>
      }

      {posts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}

      <div className="Feed_button_wrapper">
        <button
          onClick = {()=>setLimit(limit+3)}
          className="Feed_new_posts_button icon_button"
        >
          View More
        </button>
      </div>
    </div>
  )
}

// you can delete this
const fakePost = {
  createdAt: Date.now() - 10000,
  date: "2019-03-30",
  message: "Went for a run",
  minutes: 45,
  uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
}

