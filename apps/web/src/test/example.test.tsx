import { render, screen } from './test-utils'
import Home from '../app/page'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', {
      name: /AtlasPress X/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
