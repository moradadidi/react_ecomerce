import { useState } from "react";
export default function Employe ({initialEmolye}){
    const[employes,setEmployes]=useState(initialEmolye||[]);
    const[newPrenom,setnewPrenom]=useState("")
    const[newNom,setnewNom]=useState("")
    const[newAge,setnewAge]=useState("")
    const[newUpdateIndex , setnewUpdateIndex]=useState(null)

    const addEmploye =(e)=>{
        e.preventDefault();
        if(!newPrenom || !newNom || !newAge){
            alert("you need to fill all the fields")
            return;
        }

        const newEmploye = {
            prenom: newPrenom, 
            nom: newNom, 
            age: newAge
        }

        setEmployes([...employes,newEmploye])
        setnewPrenom("")
        setnewNom("")
        setnewAge("")

        alert(`${newPrenom} ${newNom} added succefly`)
        console.table(employes)
    }

    const deleteEmploye=(index_remove)=>{
        setEmployes(employes.filter((_,index)=> index !== index_remove))
    }

    const editEmploye = (index_edited) => {
        const employe = employes[index_edited]; 
        if (employe) {
            setnewPrenom(employe.prenom);
            setnewNom(employe.nom);
            setnewAge(employe.age);
            setnewUpdateIndex(index_edited)
        } else {
            alert('Employe not found!');
        }
    };
    
    
    const updateEmploye = (e)=>{
        e.preventDefault();
        if(newUpdateIndex!==null){
        const updatedEmployes = [...employes];
        const newEditedEmploye = {
            prenom: newPrenom, 
            nom: newNom, 
            age: newAge
        }
        updatedEmployes[newUpdateIndex]=newEditedEmploye

        setEmployes(updatedEmployes)
        
        setnewPrenom("")
        setnewNom("")
        setnewAge("")

        setnewUpdateIndex(null)

        alert(`${newPrenom} ${newNom} updated succefly`)
    } else {
        alert("Please select an employee to update.");
    }
    }

    const displayEmploye = ()=>{
        return employes.map((employe,index)=>(
            <>
            <tr key={index}>
                <td>{index+1}</td>
                <td>{employe.prenom}</td>
        <td>{employe.nom}</td>
        <td>{employe.age}</td>
        <td><button onClick={() => deleteEmploye(index)}> delete</button></td>
        <td><button onClick={() => editEmploye(index)}> Edit</button></td>
            </tr>
            
            </>
        ))
    }

    return(
    <>
    <form action="" onSubmit={newUpdateIndex === null ? addEmploye : updateEmploye}>
        <label htmlFor="">prenom</label>
        <input type="text" placeholder="first name" value={newPrenom} onChange={(e)=>setnewPrenom(e.target.value)}/><br />
        <label htmlFor="">nom</label>
        <input type="text" placeholder="last name" value={newNom} onChange={(e)=>setnewNom(e.target.value)}/><br />
        <label htmlFor="">age</label>
        <input type="number" placeholder=" age" value={newAge} onChange={(e)=>setnewAge(e.target.value)}/><br />
        <button type="submit">{newUpdateIndex === null ? "ajouter" : "modifier"}</button>
       
    </form><br /><br />
    <table>
        <thead>
            <tr>
            <th>index</th>
            <th>prenom</th>
            <th>nom</th>
            <th>age</th>
            <th>delete</th>
            <th>Edit</th>
            </tr>
        </thead>
        <tbody>
       {displayEmploye()}
        </tbody>
    </table>
    </>
    )
}