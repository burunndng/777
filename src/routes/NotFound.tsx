import { Link } from 'react-router-dom'

export default function NotFound() {
  return <div className="content-width empty-route"><p className="section-number">404 <span>/</span> SIGNAL LOST</p><h1>This coordinate<br /><em>is empty.</em></h1><p>The address does not resolve to a field note in this atlas.</p><Link to="/atlas" className="button button--bright">Return to the index <span>↗</span></Link></div>
}
