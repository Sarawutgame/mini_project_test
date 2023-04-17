import React from 'react'
import {collection , addDoc, getDocs, onSnapshot} from 'firebase/firestore'
import { db } from '../firebase'
import { useState, useEffect } from 'react';

export const data = () => {
    const [pet, setPet] = useState([]);
    const [post, setPost] = useState([]);

    // const fetchPost = () => {
    //     getDocs(collection(db, "mypet"))
    //         .then((querySnapshot) => {
    //             const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    //             setPet(newData)
    //             console.log(pet, newData)
    //         })
    // }

    useEffect(() =>{
        const colRef = collection(db, "mypet")

        
        onSnapshot(colRef, (snapshot) => 
            setPet(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
        )
        
    },[]);
    // console.log("daw",pet)
  return pet;
};

export const dataLost = () => {
    const [pet, setPet] = useState([]);
    const [post, setPost] = useState([]);


    useEffect(() =>{
        const colRef = collection(db, "lostpet")

        
        onSnapshot(colRef, (snapshot) => 
            setPet(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
        )
        
    },[]);
    // console.log("daw",pet)
  return pet;
};

export const datagroup = () => {
    const [pet, setPet] = useState([]);
    const [post, setPost] = useState([]);


    useEffect(() =>{
        const colRef = collection(db, "grouppet")

        
        onSnapshot(colRef, (snapshot) => 
            setPet(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
        )
        
    },[]);
    // console.log("daw",pet)
  return pet;
};
