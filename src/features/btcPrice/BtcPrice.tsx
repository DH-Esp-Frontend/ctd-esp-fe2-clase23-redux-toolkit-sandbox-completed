import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  clear,
  getBtcPriceFromState,
  getCurentBtcPrice,
  getStatusFromState,
} from "./btcPriceSlice";
import styles from "./btcPrice.module.css";

export function BtcPrice() {
  const status = useAppSelector(getStatusFromState);
  const btcPrice = useAppSelector(getBtcPriceFromState);
  const dispatch = useAppDispatch();

  if (status === "failed") {
    return (
      <div className={styles.error}>
        Hubo un error al obtener la información
      </div>
    );
  }

  return (
    <div>
      <div className={styles.row}>
        {status === "loading" ? (
          <div className={styles.loading}>
            <div>Cargando...</div>
          </div>
        ) : (
          <div className={styles.priceDetails}>
            <span>USD {btcPrice.btcPrice}</span>
            <span>{btcPrice.date}</span>
          </div>
        )}
        <button
          className={styles.button}
          aria-label="Obtener precio"
          onClick={() => dispatch(getCurentBtcPrice())}
        >
          Obtener precio
        </button>
        <button
          className={styles.button}
          aria-label="Borrar"
          onClick={() => dispatch(clear())}
        >
          Borrar datos
        </button>
      </div>
    </div>
  );
}
