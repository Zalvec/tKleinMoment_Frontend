import useSecurity from '../../useSecurity'

export default () => {
    const { logout } = useSecurity()
    logout()
    return null
}