import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Camera } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Html5Qrcode } from "html5-qrcode";

interface BarcodeScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanSuccess: (barcode: string) => void;
}

export function BarcodeScannerDialog({ open, onOpenChange, onScanSuccess }: BarcodeScannerDialogProps) {
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const elementId = "barcode-scanner-region";

  const startScanner = async () => {
    try {
      setError(null);
      
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(elementId);
      }

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 150 },
        aspectRatio: 1.333333,
      };

      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          onScanSuccess(decodedText);
          stopScanner();
          onOpenChange(false);
        },
        (errorMessage) => {
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      setError("Camera access denied or not available. Please enable camera permissions.");
      console.error("Scanner error:", err);
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current && isScanning) {
        await scannerRef.current.stop();
        setIsScanning(false);
      }
    } catch (err) {
      console.error("Error stopping scanner:", err);
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        startScanner();
      }, 100);
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [open]);

  const handleManualEntry = () => {
    const barcode = prompt("Enter barcode manually:");
    if (barcode) {
      onScanSuccess(barcode);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        stopScanner();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[600px] p-0" data-testid="dialog-barcode-scanner">
        <div className="relative bg-black">
          <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white text-xl font-bold">Scan Barcode</DialogTitle>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-white hover:bg-white/20"
                data-testid="button-close-scanner"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] bg-black">
            <div 
              id={elementId} 
              className="w-full h-full"
              data-testid="video-scanner"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/90 to-transparent">
            {error && (
              <Alert className="mb-4 bg-destructive/10 border-destructive/20">
                <AlertDescription className="text-white">{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-col gap-3">
              <p className="text-white text-center text-sm">
                {isScanning ? "Position the barcode within the frame" : "Initializing camera..."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleManualEntry}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  data-testid="button-manual-barcode"
                >
                  Enter Manually
                </Button>
                <Button
                  onClick={() => {
                    onScanSuccess("DEMO-123456");
                    onOpenChange(false);
                  }}
                  className="bg-primary text-primary-foreground"
                  data-testid="button-demo-scan"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Use Demo Scan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
