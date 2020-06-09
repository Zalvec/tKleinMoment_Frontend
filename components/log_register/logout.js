import useSecurity from '../../customHooks/useSecurity'

export default () => {
    const { logout } = useSecurity()
    logout()
    return null
}