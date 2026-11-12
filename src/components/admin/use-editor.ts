"use client";

import * as React from "react";

/**
 * Keeps an editor's draft state next to a saved baseline.
 *
 * `dirty` compares the draft against the last saved snapshot, so the header can
 * honestly say whether the browser holds unsaved edits. Call `markSaved()` once
 * the server action succeeds — it adopts the current draft as the new baseline.
 */
export function useEditor<T>(initial: T) {
  const [value, setValue] = React.useState<T>(initial);
  const [baseline, setBaseline] = React.useState(() => JSON.stringify(initial));

  const dirty = JSON.stringify(value) !== baseline;

  const markSaved = React.useCallback(() => {
    setBaseline(JSON.stringify(value));
  }, [value]);

  return { value, setValue, dirty, markSaved };
}
