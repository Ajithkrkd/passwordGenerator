import React from 'react'

const ProfileSkelton = () => {
  return (
    <>
    <div class="profile-skeleton flex flex-col items-center min-h-screen bg-gray-200 p-4">
  <div class="avatar-skeleton w-20 h-20 rounded-full bg-gray-300 animate-pulse mb-4">
  </div>
  <div class="user-info-skeleton mb-4">
    <div class="name-skeleton h-6 bg-gray-300 animate-pulse mb-2"></div>
    <div class="email-skeleton h-6 bg-gray-300 animate-pulse mb-2"></div>
    <div class="verification-skeleton h-6 bg-gray-300 animate-pulse"></div>
  </div>
  <div class="saved-passwords-skeleton w-full">
    <div class="password-card-skeleton flex items-center justify-between p-4 mb-4 rounded-md bg-gray-300 animate-pulse">
      <div class="password-name-skeleton flex-1 h-6 bg-gray-100 mr-2"></div>
      <div class="password-skeleton flex-1 h-6 bg-gray-100"></div>
      <div class="copy-button-skeleton w-8 h-8 rounded-full bg-gray-100"></div>
    </div>
    </div>
  <div class="tooltip-skeleton hidden absolute top-[-30px] right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded">
    Tooltip content
  </div>
</div>

    </>
  )
}

export default ProfileSkelton