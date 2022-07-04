import { useState } from 'react';

const usePostState = (boolState) => {
    const [postStatusState, setpostStatusState] = useState(boolState);

  const togglePostStatus = () => {
    setpostStatusState(!postStatusState);
  };

  return {postStatusState, togglePostStatus};
}

export default usePostState