import { useState } from 'react';

const usePostState = () => {
    const [postStatusState, setpostStatusState] = useState(true);

  const togglePostStatus = () => {
    setpostStatusState(!postStatusState);
  };

  return {postStatusState, togglePostStatus};
}

export default usePostState