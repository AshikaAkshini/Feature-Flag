import React,{useState} from "react";


function ActionDropdown({flag}){


const [open,setOpen]=useState(false);



return(

<div className="action-box">


<button 
onClick={()=>setOpen(!open)}
>
Actions ▼
</button>



{
open &&

<div className="dropdown">


<div>
👁 Read
</div>


<div>
✏ Update
</div>


<div>
🗑 Delete
</div>


</div>

}


</div>


);


}


export default ActionDropdown;