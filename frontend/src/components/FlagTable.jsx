import React, {useEffect,useState} from "react";
import {getFlags} from "../api/FlagApi";
import ActionDropdown from "./ActionDropdown";


function FlagTable(){

const [flags,setFlags]=useState([]);


const loadFlags=async()=>{

    const data=await getFlags();
    setFlags(data);

};


useEffect(()=>{

    loadFlags();

},[]);



return(

<div className="table-container">


<table>

<thead>

<tr>
<th>Key</th>
<th>Type</th>
<th>Status</th>
<th>Owner Team</th>
<th>Action</th>
</tr>

</thead>


<tbody>

{
flags.map(flag=>(

<tr key={flag.id}>

<td>{flag.key}</td>

<td>{flag.type}</td>

<td>
{flag.enabled ? "Enabled":"Disabled"}</td>


<td>
{flag.owner_team}
</td>


<td>

<ActionDropdown flag={flag}/>

</td>


</tr>

))

}


</tbody>


</table>


</div>


);


}


export default FlagTable;