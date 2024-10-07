'use client'
import userApiRequest from '@/apiRequest/userProfile'
import React, { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from "next/navigation"

export default function ProfileCard() {
    const router = useRouter()
    const { toast } = useToast()
    const getInfo = async () => {
        try {
            const result = await userApiRequest.getProfile()
            toast({
                description: result.payload.message
                // description: "There was a problem with your request.",
            })
            console.log(result)
        } catch (error: any) {
            console.log(error.payload)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })

        }
    }
    useEffect(() => {
        getInfo()
    }
        , [])
    return (
        <div>profileCard</div>
    )
}
