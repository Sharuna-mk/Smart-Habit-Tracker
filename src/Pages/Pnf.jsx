import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
    return (
        <div>
            <div>
                <div style={{ height: '60vh' }} className='d-flex flex-column justify-content-center align-items-center'>
                    <img width={'300px'} src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result.gif" alt="" />
                    <h1>Page Not Found</h1>
                    <h5 className="my-5">Sorry,we couldn't find the page.</h5>
                    <Link to={'/'} className='btn btn-primary'>Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Pnf
