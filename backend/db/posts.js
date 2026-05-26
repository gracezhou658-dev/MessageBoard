import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import db from "../firebase.js"

export const fetchAllPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"))

  return querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }))
}

export const fetchPostById = async (id) => {
  const postSnapshot = await getDoc(doc(db, "posts", id))

  if (!postSnapshot.exists()) {
    return null
  }

  return {
    id: postSnapshot.id,
    ...postSnapshot.data(),
  }
}
