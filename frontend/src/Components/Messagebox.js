export default function Messagebox(props){

  const{error,seterror} = props
    
    // const test = document.getElementById("exampleModal")
    // console.log(test);

    return(

        <div className={error ? "d-block" : "d-none"}>
         <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        

        <div className={`model fade ${error ? "show" : ""}`} style={{display:error ? "block" : "",height:"25%"}} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content" style={{zIndex:"10000000", position:"relative"}}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Error</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               {error}
              </div>
              <div className="modal-footer">
                <button  onClick={() => seterror("")} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-danger">Save changes</button> */}
              </div>
            </div>
          </div>

          <div onClick={() => seterror("")} style={{position:"fixed",transition:"all 0.3s ease-in-out",top:"0",left:"0",background:"#000",minWidth:"100%",minHeight:"100vh",zIndex:"10000",opacity:"0.5"}}></div>
        </div>
        
        </div>
       
    )
}