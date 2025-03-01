import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <Link href={"http://localhost:3001"} >Signup</Link>
      <br />
      <Link href={"http://localhost:3001/signin"} >Signin</Link>
    </div>
  )
}

export default page
