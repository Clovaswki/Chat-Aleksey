import { useEffect } from 'react'
import { useState } from 'react'
import { Form, FormCheck } from "react-bootstrap"

//dashboard context
import { ContextDashboard } from "../../contexts/dashboard/dashboardContext"

const styles_RadioGroupFilter = {
    display: 'flex',
    gap: '20px',
    margin: '0',
    alignItems: 'center'
}

const stylesRadioCard = {
    display: 'flex',
    gap: '10px',
}

export default function SearchTopDashboard({ setChooseFilter, chooseFilter, setAllEvaluations, dataEvaluations, setNoSearch }) {

    const { allUsers } = ContextDashboard()

    //function search users between evaluations
    const searchEvaluation = (value) => {

        var usersFiltered = allUsers.filter( user => user.name.toLowerCase().includes(value.toLowerCase()))

        var results = []

        if(usersFiltered.length > 1){
            setNoSearch(false)
            var filter_existingAssessments = dataEvaluations.filter( evaluation => 
                usersFiltered.some( user => user._id === evaluation.userId)
            )

            results = [...filter_existingAssessments]
            setAllEvaluations([...filter_existingAssessments])
        }else if(usersFiltered.length === 1){
            setNoSearch(false)
            var filter_existingAssessments = dataEvaluations.filter( evaluation => 
                usersFiltered[0]._id === evaluation.userId
            )

            results = [...filter_existingAssessments]
            setAllEvaluations([...filter_existingAssessments])
        }else if(!(value === '') && usersFiltered.length === 0){

            setNoSearch(true)

        }

        //without value of search
        if(!value){
            setNoSearch(false)
        }

    }

    return (
        <div style={{ display: 'flex' }}>
            <Form className="d-flex p-3">
                <Form.Control
                    type="search"
                    placeholder="Procure aqui..."
                    className="me-2"
                    aria-label="Search"
                    style={{width: '300px'}}
                    onChange={e => searchEvaluation(e.target.value)}
                />
            </Form>
            <div style={styles_RadioGroupFilter}>
                <span style={stylesRadioCard}>
                    <Form.Check
                        isValid name="group1"
                        type='radio'
                        style={{ display: 'flex', alignItems: 'center' }}
                        checked={chooseFilter === 'old'}
                        onChange={ () => setChooseFilter('old')}
                    />
                    <label>Mais antigas</label>
                </span>
                <span style={stylesRadioCard}>
                    <Form.Check
                        isValid name="group1"
                        type='radio'
                        style={{ display: 'flex', alignItems: 'center' }}
                        checked={chooseFilter === 'recent'}
                        onChange={() => setChooseFilter('recent')}
                    />
                    <label>Mais recentes</label>
                </span>
            </div>
        </div>

    )

}