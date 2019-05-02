import {firestore} from "firebase";
import fire from "./Fire";
export default class firestoreAPI {
    /**
     * Adding user to database,
     * user must be an object with valid id property
     */
    static addUser(user) {
        if (user.id) {
            return firestore().collection('users').doc(user.Username).set(user)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.error("need to pass an object with existing id property");
        }
    }

    static getUser(user){
        if (user){
            var ref = firestore().collection('users').doc(user);
            return ref.get().then(doc =>{
                if(doc.exists){
                    return doc.data();
                }else {
                    console.log('error')
                  }
                }).catch(error => {
                  console.log(error);
            });
        }
    }

    static addEvent(userId, event) {
        if (userId) {
            return firestore().collection('users').doc(userId).collection('events').add(event)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        } else {
            console.error("event error");
        }
    }

    static editEvent(userId, eventId, event){
        if (userId){
            return firestore().collection('users').doc(userId).collection('events').doc(eventId).set(event)
            .then(() =>{
                console.log("successfully updated")
            })
            .catch(error => {
                console.log(error)
            });
        }
    }

    static deleteEvent(userId, eventId){
        if (userId)
            return firestore().collection('users').doc(userId).collection('events').doc(eventId).delete()
            .then(()=> {
                console.log("deleted")
            })
            .catch(error => {
                console.log(error)
            });
    }

    static getEvents(userId){
        if (userId){
            var events = firestore().collection('users').doc(userId).collection('events')
            return events.get().then(snapshot => {
                if(snapshot){
                    return snapshot
                } else {
                    console.log('err')
                }
            }).catch(error => {
                console.log(error);
            });
        }

    }

}
// User Functions 




// sign Up to Firebase
export const signUpToFirebase = (email, password) =>
    new Promise((resolve, reject) => {
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => resolve('User signup'))
            .catch(error => {
                reject(error.toString())
            })
    })


    
// login to firebase
export const loginToFirebase = async (email, password) =>
new Promise((resolve, reject) => {
    fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(resolve())
        .catch(error => {
            reject(error)
        })
})


//create firestore doc based on username 

export const createUserDocinFirestore = (username, userUID, userEmail) => 
    new Promise ((resolve, reject) => {
        const ref = firestore().collection('users')

        const verifyEmail = ref.where('Email', '==', userEmail).get()
            .then(results => {
                if (!results.empty) {
                    reject('this email is already has an account')
                }
                else {
                    const verifyName = ref.doc(username).get()
                    .then(doc => {
                        if (!doc.exists) {
                            ref.doc(username).set({
                                Username: username,
                                firstName: null,
                                lastName: null,
                                Email: userEmail,
                                UID: userUID,
                                photoURL: null,
                                photoName:null,
                            })

                                .then(resolve())
                                .catch((error) => {
                                    reject(error)
                                })
                        }
                        else {
                            reject("Username is already taken")
                        }
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }
            })
            .catch(error => reject(error))
              // check if user name is available
})



export const sendFirstandLastName = async (currentUser, firstName, lastName) =>{
    if (currentUser){
        return firestore().collection('users').doc(currentUser)
        .update({
            firstName:firstName,
            lastName:lastName,
        })
        .then( () => {
            console.log("Document successfully written!");
        })
        .catch((error)=> {
            console.error("Error writing document: ", error);
        })

    }
    else {
        console.error("event error");
    }
}


// set displayName name to the current user profile
export const setDisplayNameToFirebaseAccount = (userName) =>
new Promise((resolve, reject) => {
    const user = fire.auth().currentUser
    if (user) {
        user.updateProfile({
            displayName: userName
        })
            .then(resolve())
            .catch((error) => {
                reject(error)
            })
    } else {
        reject('No user currently signed in')
    }
})

// export const createFireStoreDoc = async (username) => {
//     const { userUID, userEmail, userName } = await getUserData();
//     const setDisplayName = await setDisplayNameToFirebaseAccount(username);
//     const createUser = await createUserDocinFirestore(username, userUID, userEmail);
// }


// export const fetchDataforLogin = async () => {
//     const {userUID, userEmail, userName} = await getUserData();
//     return ({userEmail, userName})
// }


//-------------------
// Functions for uploading an image
//--------------------
//:-)


// set download link to firebase profile 

export const setDownloadLinktoFirebase = (link) => 
    new Promise((resolve,reject) => {
        const user = fire.auth().currentUser
        if (user)
        {
            user.updateProfile({
                photoURL: link
            })
                .then(resolve())
                .catch((error) => {
                    reject(error)
                })
        }
        else
        {
            reject('No user is signed in')
        }
})

// add profile picture download link to cloud firestore
export const setDownloadLinktoFirestore = (downloadURL, username, imageName) => {
    return firestore().collection('users').doc(username)
            .update({
                photoURL:downloadURL,
                photoName:imageName
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error)=> {
                console.error("Error writing document: ", error);
            })
}



//-------------------
// Functions for adding and removing friends 
//--------------------
//:-)


//function to add pals 

export const followUser = (currentUser, usertoAdd, firstName, lastName, photoURL) => 
    new Promise ((resolve, reject) => {
        const ref = firestore().collection('users').doc(currentUser).collection('following')

        ref.doc(usertoAdd).get()
                    .then(doc => {
                        if (!doc.exists) {
                            ref.doc(usertoAdd).set({
                                Username: usertoAdd,
                                firstName: firstName,
                                lastName: lastName,
                                photoURL: photoURL,
                            })

                                .then(resolve())
                                .catch((error) => {
                                    reject(error)
                                })
                        }
                        else {
                            reject("Already in your following list")
                        }
                    })
                    .catch((error)=>{
                        reject(error)
                    })
})


export const addFollowertoUser = async (paltoAdd, username, firstName, lastName, photoURL) => 

    // add current user to in the new contact contactList
    new Promise((resolve, reject) => {
        const ref = firestore().collection('users').doc(paltoAdd).collection('followers')

        ref.doc(username).get()
            .then(doc =>{
                if (!doc.exists) {
                    ref.doc(username).set({
                        Username: username,
                        firstName: firstName,
                        lastName: lastName,
                        photoURL: photoURL,
                    })

                        .then(resolve())
                        .catch((error) => {
                            reject(error)
                        })
                }
                else {
                    reject("Already Following ")
                }
            })
            .catch((error)=>{
                reject(error)
            })
        })
//function to delete friends 
export const deleteFriend = async (currentUser, palName) => {
    new Promise(async (resolve, reject) => {
        await firestore()
            .collection('users')
            .doc(currentUser)
            .collection('pals')
            .where('username', '==', palName)
            .get()
            .then(docs => {
                firestore().doc(docs.docs[0].ref._documentPath._parts.join('/').toString()).set({
                    delete: true
                }, { merge: true })
            })
            .catch(err => reject(err))
        if (currentUser !== palName) {
            await firestore()
                .collection('users')
                .doc(palName)
                .collection('pals')
                .where('username', '==', currentUser)
                .get()
                .then(docs => {
                    firestore().doc(docs.docs[0].ref._documentPath._parts.join('/').toString()).set({
                        delete: true
                    }, { merge: true })

                })
                .catch(err => reject(err))
        }
        resolve()
    })
}


/**
 * Search pals in the people screen 
 * If search == a username in the firebase firestore database return search
 * else return the next contacts name starting with the string(search)
 * 
 * 
 */
  
export const checkFriendList = async (currentUser, palName)=>
{   

    const ref = firestore().collection('users').doc(currentUser).collection('following')
    let results = []
    await ref
        .where('Username', '==',palName )
        .get()
        .then(querySnapshot =>{
            if (querySnapshot.empty)
            {
                return 
            }
            else 
            {
                // if successful, return search
                results = [{ id: 0, name: palName }]
                return 
            }
        })
            .catch((err) => {
                return 'an error has occurred while searching for pals: ', err
            })
        return results
}
export const searchPals = async (search) => {
    const ref = firestore().collection('users')
    let results = []
    // Query for exact match bewteen 'search' and a username
    await ref
        .where('Username', '==', search)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                return 
            } else {
                // if successful, return search
                results = [{ id: 0, name: search }]
                return
            }
        })
        .catch((err) => {
            return 'an error has occurred while searching for pals: ', err
        })
        

    // If previous query successful, return results, end the function
    if (results.length != 0) {
        return results
    } else if (search.length > 2) {
        // if search length > 2 chars (avoid query for one, two or three letters), 
        // Query for contact's names starting with the search
        await ref
            .orderBy('Username')
            .startAfter(search)
            .limit(10)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const name = doc.get('Username')
                    const picture = doc.get('photoURL')
                    const firstName = doc.get('firstName')
                    const lastName = doc.get('lastName')
                    if (name.charAt(0) === search.charAt(0)) {
                        const newId = results.length + 1
                        const newPotentialContact = { id: newId, name: name, picture:picture, firstName:firstName, lastName:lastName }
                        results = [...results, newPotentialContact]
                    }
                    return
                })
            })
            .catch(err => {
                return 'an error has occurred while searching for pals: ', err
            })
        return results
    }
}






