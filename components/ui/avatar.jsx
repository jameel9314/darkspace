import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import { cn } from '../../lib/utils'

const Profile = ({ image, name, className, ...props }) => {
    const fallback = name
        ?.split(" ")
        .map((word) => word[0])
        .join("");

    return (
        <div>
            <Avatar.Root className={cn("AvatarRoot", className)} {...props}>
                <Avatar.Image
                    className="AvatarImage"
                    src={image}
                    alt={name}
                />
                <Avatar.Fallback className="AvatarFallback flex justify-center items-center" delayMs={600}>
                    {fallback.toUpperCase()}
                </Avatar.Fallback>
            </Avatar.Root>
        </div>
    )
}

export default Profile