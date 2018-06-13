export default {

	Query: {
		get: (parent, {key}, {redis}) => {
			try {
				return redis.get(key)
			} catch (error) {
				return null
			}
		}
	},

	Mutation: {
		set: async (parent, {key, value}, {redis}) => {
			try {
				await redis.set(key, value)
				return true
			}	catch (error) {
				console.log(error)
				return false
			}
		}
	}
}