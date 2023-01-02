// import { db } from '@/Firebase/index'
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
// import React from 'react'

// const Changes = () => {
//     const [transactions, setTransactions] = React.useState(0)
//     const updateUserTransactions = () => {
//         // get all users and iterate through them and update their transactions to have a new field called 'includeInBudget' with a value of true

//         // get all users
//         getDocs(collection(db, 'users')).then((querySnapshot) => {
//             querySnapshot.forEach((docu) => {
//                 // get all transactions for each user
//                 getDocs(collection(db, 'users', docu.id, 'transactions')).then((querySnapshot) => {
//                     querySnapshot.forEach((docum) => {
//                         // update each transaction to have a new field called 'includeInBudget' with a value of true
//                         console.log(`user - ${docu.id} -- ${docum.id} updated`)
//                         setTransactions(prev => prev + 1)
//                         updateDoc(doc(db, 'users', docu.id, 'transactions', docum.id), { includeInBudget: true })
//                     })
//                 })
//             })
//         })
//     }
//     return (
//         <div>
//             <h1>Changes</h1>
//             <button onClick={updateUserTransactions}>Update User Transactions</button>
//             <p>{transactions} transactions updated</p>
//         </div>
//     )
// }

// export default Changes