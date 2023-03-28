import { supabase } from "@/supabase"

export default {
    async getOwner() {
        const user = await supabase.auth.getUser()
        if(!user.data.user?.id) throw new Error("No user found")

        const { data: ownerData, error: ownerError } = await supabase.from("owner").select("*").eq("id", user.data.user.id).limit(1)
        if(ownerError) throw ownerError
        if(!ownerData[0].id) throw new Error("No owner found")

        // fetch store.owner_id === owner.id

        const { data: storeData, error: storeError } = await supabase.from("store").select("*").eq("owner_id", ownerData[0].id).limit(1)
        if(storeError) throw storeError
        if(!storeData[0].id) throw new Error("No store found")

        return {
            user,
            owner: ownerData[0],
            store: storeData[0]
        }
    }
}