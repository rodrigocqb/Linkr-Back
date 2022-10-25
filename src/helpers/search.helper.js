const sortUsersArray = (allSearchedUsers, userFollows) => {
  const arrUsername = [];
  userFollows.forEach((user) => {
    arrUsername.push(user.username);
  });

  allSearchedUsers.forEach((user) => {
    if (arrUsername.includes(user.username)) {
      user.isFollowing = true;
    } else {
      user.isFollowing = false;
    }
  });

  const isFollowingFirst = allSearchedUsers.sort(
    (a, b) => Number(b.isFollowing) - Number(a.isFollowing)
  );

  return isFollowingFirst;
};

export default sortUsersArray;
