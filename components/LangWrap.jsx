import { useTranslation } from "react-i18next";


export default function LangWrap({children}) {
    const { t } = useTranslation();

  return (
    <h1>{t({children})}</h1>
  )
}
