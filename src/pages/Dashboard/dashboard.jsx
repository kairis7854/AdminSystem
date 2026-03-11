import React from 'react'

export async function loader({ request, params }) {

  return null
}

export default function Dashboard() {
  return (
    <div>dashboard</div>
  )
}

export { Dashboard as Component } 