const sortUsersArray = (allSearchedUsers, userFollows) => {
  const arrUsername = [];
  userFollows.forEach((user) => {
    arrUsername.push(user.username);
  });

  allSearchedUsers.forEach((user) => {
    user.isFollowing = arrUsername.includes(user.username);
  });

  const isFollowingFirst = allSearchedUsers.sort(
    (a, b) => Number(b.isFollowing) - Number(a.isFollowing)
  );

  return isFollowingFirst;
};

export default sortUsersArray;
