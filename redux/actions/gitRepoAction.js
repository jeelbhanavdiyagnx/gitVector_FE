export const FETCH_GITREPO_REQUEST = 'FETCH_GITREPO_REQUEST';
export const FETCH_GITREPO_SUCCESS = 'FETCH_GITREPO_SUCCESS';
export const FETCH_GITREPO_FAILURE = 'FETCH_GITREPO_FAILURE';
export const FETCH_USERREPO_REQUEST = 'FETCH_USERREPO_REQUEST';
export const FETCH_USERREPO_SUCCESS = 'FETCH_USERREPO_SUCCESS';
export const FETCH_USERREPO_FAILURE = 'FETCH_USERREPO_FAILURE';
export const REPOUPDATE_REQUEST = 'REPOUPDATE_REQUEST';
export const REPOUPDATE_SUCCESS = 'REPOUPDATE_SUCCESS';
export const REPOUPDATE_FAILURE = 'REPOUPDATE_FAILURE';
export const FETCH_REPOS_REQUEST = 'FETCH_REPOS_REQUEST';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';
export const REMOVE_REPO_REQUEST = 'REMOVE_REPO_REQUEST';
export const REMOVE_REPO_SUCCESS = 'REMOVE_REPO_SUCCESS';
export const REMOVE_REPO_FAILURE = 'REMOVE_REPO_FAILURE';
export const RESET_GITREPO = "RESET_GITREPO"

// for fetching github repos on the basis of organization
export const fetchGitRepoRequest = (payload) => ({
    type: FETCH_GITREPO_REQUEST,
    payload: payload
}
);

export const fetchGitRepoSuccess = (payload) => ({
    type: FETCH_GITREPO_SUCCESS,
    payload: payload,
});

export const fetchGitRepoFailure = (error) => ({
    type: FETCH_GITREPO_FAILURE,
    payload: error,
});

// for saving a repo
export const repoUpdateRequest = (payload) => ({
    type: REPOUPDATE_REQUEST,
    payload: payload
  });
  
  export const repoUpdateSuccess = (payload) => ({
    type: REPOUPDATE_SUCCESS,
    payload: payload,
  });
  
  export const repoUpdateFailure = (error) => ({
    type: REPOUPDATE_FAILURE,
    payload: error,
  });

  // for fetching saved repos
  export const fetchReposRequest = (repo) => ({
    type: FETCH_REPOS_REQUEST,
    payload: repo
  });
  
  export const fetchReposSuccess = (payload) => ({
    type: FETCH_REPOS_SUCCESS,
    payload: payload,
  });
  
  export const fetchReposFailure = (error) => ({
    type: FETCH_REPOS_FAILURE,
    payload: error,
  });

  // for REMOVING saved repo
  export const removeRepoRequest = (repo) => ({
    type: REMOVE_REPO_REQUEST,
    payload: repo
  });
  
  export const removeRepoSuccess = (payload) => ({
    type: REMOVE_REPO_SUCCESS,
    payload: payload,
  });
  
  export const removeRepoFailure = (error) => ({
    type: REMOVE_REPO_FAILURE,
    payload: error,
  });

  export const resetGitrepo = () => ({
    type: RESET_GITREPO
  })

  // for fetching repos on the basis of user
  export const fetchUserRepoRequest = (payload) => ({
    type: FETCH_USERREPO_REQUEST,
    payload: payload
}
);

export const fetchUserRepoSuccess = (payload) => ({
    type: FETCH_USERREPO_SUCCESS,
    payload: payload,
});

export const fetchUserRepoFailure = (error) => ({
    type: FETCH_USERREPO_FAILURE,
    payload: error,
});