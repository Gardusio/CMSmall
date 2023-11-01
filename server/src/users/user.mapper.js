class UserResponse {
    constructor(userEntity) {
        this.id = userEntity.id
        this.role = userEntity.role
        this.username = userEntity.username
        this.firstName = userEntity.firstName
        this.lastName = userEntity.lastName
    }
}

export const mapUserResponse = (userEntity) => {
    if (!userEntity || Object.keys(userEntity).length === 0) throw new Error()

    return new UserResponse(userEntity)
}