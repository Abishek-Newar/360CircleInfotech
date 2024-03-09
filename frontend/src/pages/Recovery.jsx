
import OTPInput from "./../components/OTPInput";
import Recovered from "./../components/Recovered";
import Reset from "./../components/Reset";
import { useRecoilState } from "recoil";
import { pageState } from "../data";


function Recovery() {
    const [page,setPage] = useRecoilState(pageState)
  function NavigateComponents() {
    if (page === "login") return <Recovered />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;

    return <Recovered />;
  }

  return (
    
      <div className="flex justify-center items-center">
        <NavigateComponents />
      </div>

  );
}

export default Recovery;