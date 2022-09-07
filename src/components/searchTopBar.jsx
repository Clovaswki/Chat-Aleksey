import React, { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap'
import Api from "../services/api";

import ContextAuth from "../contexts/provider/auth";
import { ContextChat } from "../contexts/chat/chatContext";

const SearchTopBar = ({ }) => { 

    const [users, setUsers] = useState([])
    const currentUser = ContextAuth()

    const { conversations, setConversations, setMessageError, setNoResults } = ContextChat()//chat context

    var convs = [...conversations] //all conversations

    useEffect(() => {
        //get users of database
        async function getUsers() {

            try {
                var response = await Api.get('/user/get-users')
                setUsers([...response.data])
            } catch (error) {
                if(error.response.status === 401){
                    setMessageError('Sua sessão expirou!')
                    setTimeout(() => document.location.reload(), 2000)//refresh
                }
            }

        }
        getUsers()
    
    }, [])
    //get conversations of database
    async function getConversations() {
        try {
            var response = await Api.get(`/chat/get-conversations/${currentUser.id}`)
            //console.log('get conversations')
            return response.data
        } catch (error) {
            if(error.response.status === 401){
                setMessageError('Sua sessão expirou!')
                setTimeout(() => document.location.reload(), 1000)//refresh
            }
        }
    }

    //test
    //search of users for params
    async function searchUser(search) {

        if (search !== '') {
            var filteredUsers = users.filter(user => user.name.toLowerCase().includes(search))
            
            if(!convs.length > 0){
                var getConversationAll = await getConversations()
                convs = [...getConversationAll]
            }

            var filteredConversations = []
            
            filteredUsers.forEach( filteredUser =>{
                filteredConversations = [...convs.filter( conv => conv.members.includes(filteredUser._id))]
                //console.log(convs)
            })
            
            filteredConversations.length == 0 
            ? setNoResults(search)
            : setNoResults('')

            //console.log(filteredConversations)
            setConversations([...filteredConversations])
            

        } else {
            setNoResults('')
            var conversationsAll = await getConversations()
            setConversations([...conversationsAll])
        }

    }
    //test

    return (
        <>
            <Form className="d-flex p-3">
                <Form.Control
                    type="search"
                    placeholder="Ache os seus amigos..."
                    className="me-2"
                    aria-label="Search"
                    onChange={event => searchUser(event.target.value)}
                />
            </Form>
            <div className="line" style={{ width: '100%', height: "1px" }}></div>
        </>
    )

}

export default SearchTopBar