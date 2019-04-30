import {firestore} from "firebase";
export default class firestoreAPI {
    /**
     * Adding user to database,
     * user must be an object with valid id property
     */
    static addUser(user) {
        if (user.id) {
            return firestore().collection('users').doc(user.id).set(user)
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