import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();


// const signIn = (email, password) => {
//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {

//             const user = userCredential.user;
//             console.log("登入成功：", user.email);
//         })
//         .catch((error) => {
//             console.error("登入失敗：", error.code, error.message);
//         });
// };