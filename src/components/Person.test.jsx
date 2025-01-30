import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Person from './Person'


describe('Person component', () => {
    test('Person info renders correctly', () => {
        const mockDel = jest.fn()
        const personData = {
            name: 'mock name',
            number: '050 123 4567',
            id: '9999',
            del: mockDel
        }
        render(<Person { ...personData } />)
        expect(screen.getByTestId('personDiv')).toHaveTextContent(/mock name.*050 123 4567/)
    })
    
    test('Delete button renders correctly', () => {
        const mockDel = jest.fn()
        const personData = {
            name: 'mock name',
            number: '050 123 4567',
            id: '9999',
            del: mockDel
        }
        render(<Person { ...personData } />)
        expect(screen.getByTestId('deleteButton')).toHaveTextContent('delete')
    })
})
