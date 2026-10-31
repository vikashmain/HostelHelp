import CommunityBoard from '../components/CommunityBoard'

export default function Community() {
  return (
    <div className="page-narrow">
      <div className="page-header"><div><h1>Community complaints</h1><p className="page-subtitle">Complaints shared by residents.</p></div></div>
      <CommunityBoard />
    </div>
  )
}
