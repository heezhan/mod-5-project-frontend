
const addNewCurrentUser = (userObj) => {
    return {type: "ADD_NEW_CURRENT_USER", payload: userObj}
}

const fetchNewCurrentUser = (userObj) => {
    return (dispatch) => {
        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: userObj.username,
                password: userObj.password
            })
        })
        .then(resp => resp.json())
        .then(userObj => {
            if (userObj.message) {
                alert(userObj.message)
            } else {
                dispatch(addNewCurrentUser(userObj))
            }
        })
    }
}

export { addNewCurrentUser, fetchNewCurrentUser }