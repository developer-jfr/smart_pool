import { BalanceModule, HomeModule, ReplenishmentModule } from 'modules';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Pages = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<HomeModule />} />
            <Route path='/balance' element={<BalanceModule />} />
            <Route path='/replenishment' element={<ReplenishmentModule />} />
        </Routes>
    </Router>
  )
}

export default Pages