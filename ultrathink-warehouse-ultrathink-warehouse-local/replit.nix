{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.postgresql_15
    pkgs.libffi
    pkgs.cairo
    pkgs.pango
    pkgs.glib
    pkgs.gdk-pixbuf
    pkgs.fontconfig
  ];
}