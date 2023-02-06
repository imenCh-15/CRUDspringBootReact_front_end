import Navbar from "../layouts/Navbar";
import { render } from '@testing-library/react'

describe('Navbar', () => {
    test('Should render without crashing', async () => {
        render(
            
                <Navbar />
            
        )
    })
})