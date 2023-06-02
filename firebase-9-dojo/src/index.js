import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp, 
  getDoc, updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBXQR7tIRSD71uhPPjFzHy8Mc8zE3B4Lzk",
  authDomain: "fir-9-dojo-6f8c9.firebaseapp.com",
  projectId: "fir-9-dojo-6f8c9",
  storageBucket: "fir-9-dojo-6f8c9.appspot.com",
  messagingSenderId: "14790925081",
  appId: "1:14790925081:web:f4e2ab403341626db60388"
};
// init firebase app
initializeApp(firebaseConfig)

// init services 
const db = getFirestore()

// collection ref 
const colRef = collection(db, 'books')

// query 

const q = query(colRef, orderBy('createdAt'))

// real time collection data 
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books);
})

// adding documents

const addBookForm = document.querySelector('.add')

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      addBookForm.reset()
    })
})

// deleting documents

const deleteBookForm = document.querySelector('.delete')

deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// get a single document 

const docRef = doc(db, 'books', 'KGPjH5YjWObYwHMHnvk4')

getDoc(docRef)
  .then((doc) => {
    console.log(doc.data(), doc.id);
  })

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

const updateForm = document.querySelector('.update')

updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef,  {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
})